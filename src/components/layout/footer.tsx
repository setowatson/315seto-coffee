import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground">
            特定商取引法に基づく表記
          </Link>
        </div>
      </div>
    </footer>
  );
} 