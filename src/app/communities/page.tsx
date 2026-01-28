import CommunityList from "@/components/page/community-list";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col gap-5 px-7 py-5 w-full max-w-2xl mx-auto">
      <h1 className="text-2xl">Manage Communities</h1>
      <CommunityList />
    </div>
  );
}
