export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 pb-16 prose dark:prose-invert">
      {children}
    </div>
  );
}
