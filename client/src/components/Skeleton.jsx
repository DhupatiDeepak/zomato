const SkeletonCard = () => {
    return (
        <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 relative flex flex-col h-full animate-pulse backdrop-blur-md">
            {/* Image Skeleton */}
            <div className="h-64 bg-white/5 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                
                {/* Weight badge skeleton */}
                <div className="absolute bottom-4 left-4">
                    <div className="w-24 h-5 bg-white/10 rounded-full"></div>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                {/* Category skeleton */}
                <div className="w-20 h-3 bg-primary/20 mb-3 rounded-full"></div>

                {/* Title skeleton */}
                <div className="w-full h-6 bg-white/10 mb-2 rounded-lg"></div>
                <div className="w-2/3 h-6 bg-white/10 mb-4 rounded-lg"></div>

                {/* Price skeleton */}
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-16 h-8 bg-white/10 rounded-lg"></div>
                    <div className="w-12 h-4 bg-white/5 rounded-lg"></div>
                    <div className="w-20 h-5 bg-secondary/10 rounded-full"></div>
                </div>

                {/* Button skeleton */}
                <div className="mt-auto">
                    <div className="w-full h-12 bg-white/10 rounded-xl"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
