import AuthRootLayout from "../auth-root-layout";

export const metadata = {
  title: "Dashboard",
  description: "Query your Data, Wherever they are.",
};
export default async function HomePage() {
  return (
    <AuthRootLayout title="Dashboard">
      <h1>Welcome to dashboard page</h1>
    </AuthRootLayout>
  );
}
