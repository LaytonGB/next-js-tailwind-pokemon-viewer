import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#4B5563" highlightColor="#667284">
      <div className="flex flex-col">
        <div className="flex flex-row place-items-center gap-5 bg-slate-700 border-b border-slate-500 p-5 sticky top-0 absolute">
          <Skeleton circle width={200} height={200} />
          <div className="flex flex-col justify-around">
            <h1 className="text-6xl mb-3">
              <Skeleton width={300} height="3.75rem" />
            </h1>
            <div className="flex flex-col gap-1">
              <Skeleton width={200} height="1.25rem" count={2} />
            </div>
          </div>
        </div>

        <div className="p-8 flex flex-col gap-5">
          <div>
            <h2 className="text-4xl py-3">
              <Skeleton width={200} height="2.25rem" />
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-flow-row-dense pl-5">
              <Skeleton width={200} height="1.25rem" count={10} />
            </div>
          </div>
          <div>
            <h2 className="text-4xl py-3">
              <Skeleton width={200} height="2.25rem" />
            </h2>
            <div className="pl-5">
              <Skeleton width={200} height="1.25rem" count={10} />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
