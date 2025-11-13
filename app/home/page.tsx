import { FoodieSuggestions } from "./components/foodieSugg";
import { FoodPost } from "./components/foodPost";
import { PostForm } from "./components/postForm";

export default function Home() {
  return (
    <div className="col-span-2 space-y-[20px]">
      <PostForm />
      {Array.from({ length: 20 }).map((item, idx) => {
        if (idx == 2) return <FoodieSuggestions key={idx} />;
        return <FoodPost key={idx} />;
      })}
      <FoodPost />
    </div>
  );
}
