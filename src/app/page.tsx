import HomeFeed from "@/components/page/home-feed";

export default async function Home() {
  return (
    <div className="flex justify-between">
      <div className="grow max-w-4xl">
        <HomeFeed withEdit={true} />
      </div>
      <div className="w-100 shrink-0 hidden xl:block">
        <div className="m-5 rounded-lg bg-neutral-700 pt-7">
          <div className="uppercase text-sm text-neutral-300 ml-5">
            Recent Posts
          </div>
          <HomeFeed className="w-70 flex flex-col ml-4" />
        </div>
      </div>
    </div>
  );
}
