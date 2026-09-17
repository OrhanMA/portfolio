import { describe, test, expect, vi, beforeEach } from "vitest";
import { page } from "vitest/browser";
import { enDict, frDict, renderWithProviders } from "@/test/browser-utils";
import { ContactForm } from "@/components/contact-form";

const contactDict = {
  contactForm: frDict.contactForm,
  contactReasons: frDict.contactReasons,
  contactValidation: frDict.contactValidation,
  contactErrors: frDict.contactErrors,
  legal: frDict.legal,
};

const englishContactDict = {
  contactForm: enDict.contactForm,
  contactReasons: enDict.contactReasons,
  contactValidation: enDict.contactValidation,
  contactErrors: enDict.contactErrors,
  legal: enDict.legal,
};

// Mock the server action
vi.mock("@/app/[locale]/actions/contact", () => ({
  sendContactEmail: vi.fn(),
  submitContactForm: vi.fn(),
}));

// Mock reCAPTCHA
vi.mock("@/lib/recaptcha-client", () => ({
  executeRecaptcha: vi.fn(() => Promise.resolve("")),
  preloadRecaptcha: vi.fn(() => Promise.resolve()),
}));

describe("ContactForm (browser)", () => {
  beforeEach(async () => {
    const { sendContactEmail } = await import(
      "@/app/[locale]/actions/contact"
    );
    vi.mocked(sendContactEmail).mockReset();
  });

  test("renders all form fields", async () => {
    await renderWithProviders(<ContactForm locale="fr" dict={contactDict} />);

    // Name field
    await expect
      .element(page.getByLabelText("Nom complet"))
      .toBeVisible();

    // Email field
    await expect
      .element(page.getByLabelText("Adresse de courriel"))
      .toBeVisible();

    // Reason select
    const reason = page.getByLabelText("Raison du contact");
    await expect
      .element(reason)
      .toBeVisible();
    expect(reason.element().className).toContain("h-11");
    expect(reason.element().className).toContain("w-full");

    // Message textarea
    await expect
      .element(page.getByLabelText("Message"))
      .toBeVisible();

    // Submit button
    await expect
      .element(page.getByRole("button", { name: /envoyer/i }))
      .toBeVisible();
  });

  test.each([
    ["fr", contactDict],
    ["en", englishContactDict],
  ] as const)(
    "displays every selected reason with its localized label in %s",
    async (locale, dict) => {
      await renderWithProviders(<ContactForm locale={locale} dict={dict} />);

      const reasonSelect = page.getByLabelText(dict.contactForm.reasonLabel);

      for (const reason of dict.contactReasons) {
        await reasonSelect.click();
        const reasonOption = page.getByText(reason.label, { exact: true });
        expect(reasonOption.element().className).toContain("col-start-2");
        expect(reasonOption.element().className).toContain("whitespace-nowrap");
        const reasonOptionStyles = getComputedStyle(reasonOption.element());
        expect(reasonOptionStyles.gridColumnStart).toBe("2");
        expect(reasonOptionStyles.whiteSpace).toBe("nowrap");
        await reasonOption.click();
        await expect.element(reasonSelect).toHaveTextContent(reason.label);
      }
    },
  );

  test("focuses the first invalid field and exposes its error description", async () => {
    await renderWithProviders(<ContactForm locale="fr" dict={contactDict} />);

    await page.getByRole("button", { name: /envoyer/i }).click();

    const name = page.getByLabelText("Nom complet");
    await expect.element(name).toHaveFocus();
    await expect.element(name).toHaveAttribute("aria-invalid", "true");
    await expect.element(name).toHaveAttribute("aria-describedby", "name-error");
    await expect
      .element(page.getByText(frDict.contactValidation.nameMin))
      .toHaveAttribute("id", "name-error");
  });

  test("focuses the select trigger when it is the first invalid control", async () => {
    await renderWithProviders(<ContactForm locale="fr" dict={contactDict} />);

    await page.getByLabelText("Nom complet").fill("Jean Dupont");
    await page.getByLabelText("Adresse de courriel").fill("jean@example.com");
    await page.getByRole("button", { name: /envoyer/i }).click();

    const reason = page.getByLabelText("Raison du contact");
    await expect.element(reason).toHaveFocus();
    await expect.element(reason).toHaveAttribute("aria-invalid", "true");
    await expect
      .element(reason)
      .toHaveAttribute("aria-describedby", "reason-error");
  });

  test("displays the privacy notice and its localized link", async () => {
    await renderWithProviders(<ContactForm locale="fr" dict={contactDict} />);

    await expect
      .element(page.getByText(/base de l’intérêt légitime/i))
      .toBeVisible();
    await expect
      .element(page.getByRole("link", { name: /politique de confidentialité/i }))
      .toHaveAttribute("href", "/fr/politique-confidentialite");
    expect(
      page
        .getByRole("link", { name: /politique de confidentialité/i })
        .element()
        .parentElement?.className,
    ).toContain("block");
    await expect
      .element(page.getByRole("link", { name: frDict.legal.editorEmail }))
      .toHaveAttribute("href", `mailto:${frDict.legal.editorEmail}`);
  });

  test("honeypot field is hidden from users via aria-hidden", async () => {
    await renderWithProviders(<ContactForm locale="fr" dict={contactDict} />);

    // Honeypot is inaccessible to screen readers and positioned outside the
    // visible viewport, while remaining available to bot submissions.
    const honeypotInput = page.getByLabelText("Website").element();
    const container = honeypotInput.closest("[aria-hidden]");
    expect(container).toBeTruthy();
    expect(container?.getAttribute("aria-hidden")).toBe("true");
    expect(container?.className).toContain("-left-[10000px]");
  });

  test("uses the server action fallback instead of a mailto form action", async () => {
    await renderWithProviders(<ContactForm locale="fr" dict={contactDict} />);

    const form = page.getByLabelText("Nom complet").element().closest("form");
    expect(form).toBeTruthy();
    expect(form?.getAttribute("action")).not.toContain("mailto:");
  });

  test("form fields accept input", async () => {
    await renderWithProviders(<ContactForm locale="fr" dict={contactDict} />);

    // Fill name
    await page.getByLabelText("Nom complet").fill("Jean Dupont");
    await expect
      .element(page.getByLabelText("Nom complet"))
      .toHaveValue("Jean Dupont");

    // Fill email
    await page.getByLabelText("Adresse de courriel").fill("jean@example.com");
    await expect
      .element(page.getByLabelText("Adresse de courriel"))
      .toHaveValue("jean@example.com");

    // Fill message
    await page.getByLabelText("Message").fill("Bonjour, ceci est un message de test pour le formulaire de contact.");
    await expect
      .element(page.getByLabelText("Message"))
      .toHaveValue("Bonjour, ceci est un message de test pour le formulaire de contact.");
  });

  test("character counter appears when typing", async () => {
    await renderWithProviders(<ContactForm locale="fr" dict={contactDict} />);

    await page.getByLabelText("Message").fill("Hello World");

    await expect
      .element(page.getByText(/11\/5000/))
      .toBeInTheDocument();
  });

  test("shows success state after successful submission", async () => {
    const { sendContactEmail } = await import(
      "@/app/[locale]/actions/contact"
    );
    vi.mocked(sendContactEmail).mockResolvedValue({
      status: "success",
      success: true,
      message: "Message envoye avec succes !",
    });

    await renderWithProviders(<ContactForm locale="fr" dict={contactDict} />);

    // Fill required fields
    await page.getByLabelText("Nom complet").fill("Jean Dupont");
    await page.getByLabelText("Adresse de courriel").fill("jean@example.com");

    // Select a reason via the trigger button
    await page.getByLabelText("Raison du contact").click();
    await page.getByText("Offre").click();

    await page
      .getByLabelText("Message")
      .fill("Bonjour, ceci est un message de test assez long pour passer la validation.");

    // Submit
    await page.getByRole("button", { name: /envoyer/i }).click();

    // Should show success state
    await expect
      .element(page.getByText("Message envoyé !"), { timeout: 5000 })
      .toBeVisible();
  });

  test("shows error banner after failed submission", async () => {
    const { sendContactEmail } = await import(
      "@/app/[locale]/actions/contact"
    );
    vi.mocked(sendContactEmail).mockResolvedValue({
      status: "validation-error",
      success: false,
      message: "Une erreur est survenue.",
    });

    await renderWithProviders(<ContactForm locale="fr" dict={contactDict} />);

    // Fill required fields
    await page.getByLabelText("Nom complet").fill("Jean Dupont");
    await page.getByLabelText("Adresse de courriel").fill("jean@example.com");

    await page.getByLabelText("Raison du contact").click();
    await page.getByText("Offre").click();

    await page
      .getByLabelText("Message")
      .fill("Bonjour, ceci est un message de test assez long pour passer la validation.");

    await page.getByRole("button", { name: /envoyer/i }).click();

    await expect
      .element(page.getByText("Une erreur est survenue."), { timeout: 5000 })
      .toBeVisible();
  });

  test("keeps entered fields when the action transport fails", async () => {
    const { sendContactEmail } = await import(
      "@/app/[locale]/actions/contact"
    );
    vi.mocked(sendContactEmail).mockRejectedValueOnce(
      new Error("Action unavailable"),
    );

    await renderWithProviders(<ContactForm locale="fr" dict={contactDict} />);

    await page.getByLabelText("Nom complet").fill("Jean Dupont");
    await page.getByLabelText("Adresse de courriel").fill("jean@example.com");
    await page.getByLabelText("Raison du contact").click();
    await page.getByText("Offre").click();
    await page
      .getByLabelText("Message")
      .fill("Message conservé pendant une panne temporaire du service.");

    await page.getByRole("button", { name: /envoyer/i }).click();

    await expect
      .element(page.getByText(frDict.contactErrors.temporarilyUnavailable), {
        timeout: 5000,
      })
      .toBeVisible();
    await expect
      .element(page.getByLabelText("Nom complet"))
      .toHaveValue("Jean Dupont");
    await expect
      .element(page.getByLabelText("Message"))
      .toHaveValue("Message conservé pendant une panne temporaire du service.");
  });
});
