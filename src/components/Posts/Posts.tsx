import classes from "./Posts.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsData, getTags } from "./GetPosts-reducer";
import { PostCard } from "./Post/PostCard";
import { Redirect } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useForm } from "react-hook-form";
import Checkbox from "@material-ui/core/Checkbox";

export const Posts = React.memo(function () {
  const posts = useSelector((state: any) => state.postsPage.data);
  const categories = useSelector((state: any) => state.postsPage.categories);
  const isAuth = useSelector((state: any) => state.auth.isAuth);

  const { register } = useForm();
  const dispatch = useDispatch();

  const [tag, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPostsData(1, tag.join()));
    dispatch(getTags());
  }, [dispatch, tag]);

  if (!isAuth) {
    return <Redirect to={"/login"} />;
  }

  return (
    <>
      <div className={classes.search}>
        <div className={classes.filter}>
          <div className={classes.filterPadding}>
            <span>Filter</span>
            <div className={classes.checkboxes}>
              <form>
                {categories.map((category: any) => (
                  <div key={category.id} className={classes.checkbox}>
                    <Checkbox
                      onChange={(e) => {
                        e.target.checked
                          ? // @ts-ignore
                            setTags([...tag, category.name])
                          : setTags((tag) =>
                              tag.filter((tag) => tag !== category.name)
                            );
                      }}
                      ref={register}
                      name={category.name}
                      id={category.name}
                      size={"small"}
                      color={"primary"}
                    />

                    <span>{category.name}</span>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
        <div className={classes.results}>
          <div className={classes.resultsWrapper}>
            {posts.map((post: any) => {
              return (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  categories={post.categories}
                  content={post.content}
                  createdAt={post.createdAt}
                  updatedAt={post.updatedAt}
                  user={post.user}
                />
              );
            })}
          </div>
          <PaginationControlled tag={tag} />
        </div>
      </div>
    </>
  );
});

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export const PaginationControlled = React.memo(function (props: any) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = React.useState(
    useSelector((state: any) => state.postsPage.current_page)
  );
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(getPostsData(value, props.tag.join()));
  };

  return (
    <div className={classes.root}>
      <Pagination count={10} page={page} onChange={handleChange} />
    </div>
  );
});
