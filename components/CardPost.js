import ButtonDeletePost from "./ButtonDeletePost";

const CardPost = ({ post }) => {
  return (
    <li className="bg-base-100 rounded-3xl p-6 flex justify-between items-center">
      {/* LEFT SIDE */}
      <div>
        <div className="font-bold mb-1">{post.title}</div>

        <div className="opacity-80 leading-relaxed max-h-32 overflow-scroll text-sm">
          {post.description}
        </div>
      </div>

      {/* RIGHT SIDE DELETE BUTTON */}
      <ButtonDeletePost postId={post._id.toString()} />
    </li>
  );
};

export default CardPost;
