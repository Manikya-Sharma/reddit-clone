import SubSide from "@/components/page/sub-side";
import { WithComments } from "@/components/page/with-comments";

export default async function Page({
  params,
}: PageProps<"/r/[subTitle]/comments/[postId]">) {
  const { subTitle, postId } = await params;
  const parsedPostId = parseInt(postId, 10);

  return (
    <div className="flex-1 relative">
      <WithComments subTitle={subTitle} postId={parsedPostId} />
      <SubSide subTitle={subTitle} />
    </div>
  );
}
