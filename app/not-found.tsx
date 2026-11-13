import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="container error-page">
      <p className="eyebrow">404 / Page not found</p>
      <h1>Let’s find a clearer path.</h1>
      <p>
        This page isn’t available. Explore the portfolio or open the resume
        preview.
      </p>
      <div className="hero-actions">
        <Link href="/" className="button button-primary">
          Back to portfolio
        </Link>
        <Link href="/resume" className="text-link">
          Resume preview →
        </Link>
      </div>
    </main>
  );
}
