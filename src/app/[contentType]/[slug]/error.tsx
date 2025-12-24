'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const contentType = params?.contentType as string;

  useEffect(() => {
    console.error('Content detail error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4 max-w-lg px-gutter">
        <h2 className="text-2xl font-bold font-heading">
          Unable to load this page
        </h2>
        <p className="text-muted-foreground">
          {error.message || 'An error occurred while loading this content'}
        </p>
        <div className="flex gap-3 justify-center pt-4">
          <Button onClick={reset}>Try again</Button>
          {contentType && (
            <Button variant="outline" asChild>
              <Link href={`/${contentType}`} className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to {contentType}
              </Link>
            </Button>
          )}
          <Button variant="ghost" asChild>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
