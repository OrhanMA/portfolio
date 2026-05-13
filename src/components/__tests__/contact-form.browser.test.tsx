import { describe, test, expect, vi, beforeEach } from "vitest";
import { page } from "vitest/browser";
import { renderWithProviders } from "@/test/browser-utils";
import { ContactForm } from "@/components/contact-form";

// Mock the server action
vi.mock("@/app/[locale]/actions/contact", () => ({
  sendContactEmail: vi.fn(),
}));

// Mock reCAPTCHA
vi.mock("@/lib/recaptcha", () => ({
  executeRecaptcha: vi.fn(() => Promise.resolve("")),
  RECAPTCHA_THRESHOLD: 0.5,
}));

describe("ContactForm (browser)", () => {
  beforeEach(async () => {
    const { sendContactEmail } = await import(
      "@/app/[locale]/actions/contact"
    );
    vi.mocked(sendContactEmail).mockReset();
  });

  test("renders all form fields", async () => {
    await renderWithProviders(<ContactForm />);

    // Name field
    await expect
      .element(page.getByLabelText("Nom complet"))
      .toBeVisible();

    // Email field
    await expect
      .element(page.getByLabelText("Adresse email"))
      .toBeVisible();

    // Reason select
    await expect
      .element(page.getByLabelText("Raison du contact"))
      .toBeVisible();

    // Message textarea
    await expect
      .element(page.getByLabelText("Message"))
      .toBeVisible();

    // Submit button
    await expect
      .element(page.getByRole("button", { name: /envoyer/i }))
      .toBeVisible();
  });

  test("honeypot field is hidden from users via aria-hidden", async () => {
    await renderWithProviders(<ContactForm />);

    // Honeypot container has aria-hidden="true" — invisible to screen readers
    // and positioned off-screen via CSS (-9999px positioning)
    const honeypotInput = page.getByLabelText("Website").element();
    const container = honeypotInput.closest("[aria-hidden]");
    expect(container).toBeTruthy();
    expect(container?.getAttribute("aria-hidden")).toBe("true");
  });

  test("form fields accept input", async () => {
    await renderWithProviders(<ContactForm />);

    // Fill name
    await page.getByLabelText("Nom complet").fill("Jean Dupont");
    await expect
      .element(page.getByLabelText("Nom complet"))
      .toHaveValue("Jean Dupont");

    // Fill email
    await page.getByLabelText("Adresse email").fill("jean@example.com");
    await expect
      .element(page.getByLabelText("Adresse email"))
      .toHaveValue("jean@example.com");

    // Fill message
    await page.getByLabelText("Message").fill("Bonjour, ceci est un message de test pour le formulaire de contact.");
    await expect
      .element(page.getByLabelText("Message"))
      .toHaveValue("Bonjour, ceci est un message de test pour le formulaire de contact.");
  });

  test("character counter appears when typing", async () => {
    await renderWithProviders(<ContactForm />);

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
      success: true,
      message: "Message envoye avec succes !",
    });

    await renderWithProviders(<ContactForm />);

    // Fill required fields
    await page.getByLabelText("Nom complet").fill("Jean Dupont");
    await page.getByLabelText("Adresse email").fill("jean@example.com");

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
      success: false,
      message: "Une erreur est survenue.",
    });

    await renderWithProviders(<ContactForm />);

    // Fill required fields
    await page.getByLabelText("Nom complet").fill("Jean Dupont");
    await page.getByLabelText("Adresse email").fill("jean@example.com");

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
});
