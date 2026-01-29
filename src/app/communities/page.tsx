import CommunityList from "@/components/page/community-list";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getUser } from "@/lib/server-actions";

export default async function Page() {
  const { user } = await getUser();
  return (
    <div className="flex justify-between">
      <div className="flex-1 flex flex-col gap-5 px-7 py-5 w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">Manage Communities</h1>
        <Field orientation="horizontal">
          <Input type="search" placeholder="Search..." />
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-white text-black text-sm cursor-pointer"
          >
            Filter
          </button>
        </Field>
        <CommunityList user={user} />
      </div>
      <div className="flex flex-col gap-2 mt-16 px-6 py-2 w-full max-w-lg">
        <div className="bg-neutral-600 p-4 rounded-md">All Communities</div>
        <div className="p-4 rounded-md hover:bg-neutral-800">Favourites</div>
      </div>
    </div>
  );
}
