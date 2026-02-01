import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader for ProductCard component
 */
export function ProductCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      {/* Image Skeleton */}
      <div className="aspect-square bg-muted p-4">
        <Skeleton className="h-full w-full" />
      </div>

      <CardContent className="p-4">
        {/* Title Skeleton */}
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-3/4" />

        {/* Rating Skeleton */}
        <Skeleton className="mb-2 h-3 w-24" />

        {/* Price Skeleton */}
        <Skeleton className="h-6 w-20" />
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}
