import { LoaderFunction, useLoaderData } from "remix";
import { Joke } from "@prisma/client";
import { db } from "~/utils/dbserver";
import { Link } from "remix";
type LoaderData = { joke: Joke | null };
export let loader: LoaderFunction = async ({ params }) => {
  let joke = await db.joke.findUnique({ where: { id: params.jokeId } });
  if (!joke) throw new Error("Joke not found");
  let data: LoaderData = { joke };

  return data;
};
export default function JokeRoute() {
  let data = useLoaderData<LoaderData>();
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke?.content}</p>
      <Link to=".">{data.joke?.name} Permalink</Link>
    </div>
  );
}
