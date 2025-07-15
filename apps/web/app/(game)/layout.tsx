export default async function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="py-20 container mx-auto">{children}</div>;
}
