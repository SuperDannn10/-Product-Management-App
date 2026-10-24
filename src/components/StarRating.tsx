import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating?: number;
  showNumeric?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 5,
  showNumeric = true,
  size = 'sm'
}) => {
  const safeRating = Number(rating) || 0;
  const iconSize = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  return (
    <div className="inline-flex items-center gap-1.5" title={`Rated ${safeRating.toFixed(1)} out of 5`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.round(safeRating);
          return (
            <Star
              key={star}
              className={`${iconSize} ${
                isFilled
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200'
              }`}
            />
          );
        })}
      </div>
      {showNumeric && (
        <span className="text-xs font-bold text-slate-700">
          {safeRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
