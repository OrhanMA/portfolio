export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <article className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert prose-headings:tracking-normal prose-a:text-primary prose-pre:rounded-lg prose-pre:border prose-pre:border-border">
        {children}
      </article>
    </main>
  );
}
