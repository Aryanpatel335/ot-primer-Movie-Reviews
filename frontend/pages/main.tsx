import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Comment from "../components/Comment";
import AddComment from "../components/AddComment";
import { MovieRounded } from "@mui/icons-material";

interface MovieProperties {
  title: String;
  id: number;
  poster_path: String;
}
interface ReviewProperties {
  comment: CommentProperties;
  username: String;
  reviewID: number;
  movieName: String;
  vote: VoteProperties;
}

interface CommentProperties {
  body: String;
}
interface VoteProperties {
  likeDislike: number;
}

export default function Home() {
  const [movieList, setMovieList] = useState<MovieProperties[]>([]);
  const [reviewList, setReviewList] = useState<ReviewProperties[]>([]);

  const [username, setUsername] = useState("");
  const getAllMovies = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/all/movies");
      setMovieList(resp.data.results.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };
  const getReviews = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/review");
      setReviewList(resp.data.reverse());
      console.log(resp.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(
        new URLSearchParams(window.location.search).get("user") || ""
      );
    }
    getAllMovies();
    getReviews();
  }, []);

  const listItems = movieList.map((movie) => (
    <>
      {console.log(movie)}
      <Movie
        key={movie.id}
        movieTitle={movie.title}
        movieImg={movie.poster_path}
        movieId={movie.id}
      ></Movie>
    </>
  ));

  const listComments = reviewList.map((review) => (
    <>
      {console.log(review)}
      <Comment
        key={review.reviewID}
        userID={review.username}
        comment={review.comment.body}
        movieTitle={review.movieName}
        vote={review.vote.likeDislike}
      ></Comment>
      <br></br>
    </>
  ));

  return (
    <>
      <nav>
        <div className="user-name">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-user"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx={12} cy={7} r={4}></circle>
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
          </svg>
          {username}
        </div>
        <div className="log-out">
          <Link href="/">
            <input type="submit" value="Logout" />
          </Link>
        </div>
      </nav>

      <h3
        style={{
          textAlign: "center",
          paddingBottom: "20px",
        }}
      >
        Top 5 Movies within the Last 24 Hours
      </h3>
      <div id="movie-container">{listItems}</div>
      <div id="comment-container">
        <a>Comments</a>
        <AddComment movies={movieList} username={username}></AddComment>
        <a>All Comments</a>
        <br></br>
        <div>{listComments}</div>
        <br></br>
      </div>
    </>
  );
}
