import { useHistory, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import getFormData from "./services/getFormData";
import setFormData from "./services/setFormData";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesType } from "../../Post/PostCard";
import { getTags } from "../../GetPosts-reducer";

export const Tags = React.memo(function () {
  const dispatch = useDispatch();
  const tags = useSelector((state: any) => state.postsPage.categories);
  const history = useHistory();
  const location = useLocation();
  const [initialValues] = useState(getFormData());

  useEffect(() => {
    dispatch(getTags());
    setUnusedCategories(tags);
    if (initialValues["categories"]) {
      setCategories(initialValues["categories"]);
      setUnusedCategories(initialValues["unusedCategories"]);
    }
  }, [dispatch, initialValues, tags]);

  const onBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [unusedCategories, setUnusedCategories] = useState<CategoriesType[]>(
    []
  );

  const onSubmit = useCallback(() => {
    if (categories.length !== 0) {
      let newOBJ = { ...initialValues, categories, unusedCategories };
      setFormData(newOBJ);
      history.push({
        ...location,
        state: {
          activeStep: 3,
        },
      });
    }
  }, [history, location, initialValues, categories, unusedCategories]);

  const handleDelete = (chipToDelete: CategoriesType) => () => {
    setCategories((chips) =>
      chips.filter((chip) => chip.id !== chipToDelete.id)
    );
    setUnusedCategories([...unusedCategories, chipToDelete]);
  };

  const onHandleDelete = (chipToDelete: CategoriesType) => () => {
    setUnusedCategories((chips) =>
      chips.filter((chip) => chip.id !== chipToDelete.id)
    );
    setCategories([...categories, chipToDelete]);
  };

  return (
    <>
      <Button onClick={onBack}>Back</Button>
      <Paper component="ul">
        {categories.map((data) => {
          return (
            <li key={data.id}>
              <Chip label={data.name} onDelete={handleDelete(data)} />
            </li>
          );
        })}
      </Paper>
      <hr />
      <Paper component="ul">
        {unusedCategories.map((data) => {
          return (
            <li key={data.id}>
              <Chip label={data.name} onClick={onHandleDelete(data)} />
            </li>
          );
        })}
      </Paper>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={onSubmit}
      >
        ülevaade
      </Button>
    </>
  );
});
