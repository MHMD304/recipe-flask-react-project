import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getRecipeById, createRecipe, editRecipe } from "../api/fetcher";

const AddRecipe = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [recipeModel, setRecipeModel] = useState({
    title: "",
    description: "",
  });

  // Prefill form if editing
  useEffect(() => {
    if (id) {
      getRecipeById(id)
        .then((res) => setRecipeModel({ title: res.title, description: res.description }))
        .catch((err) => console.error("Failed to fetch recipe:", err));
    }
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("You must be logged in to add or edit recipes.");
      navigate("/auth"); 
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await editRecipe(id, recipeModel);
        console.log("Recipe updated!");
      } else {
        await createRecipe(recipeModel);
        console.log("Recipe created!");
        setRecipeModel({ title: "", description: "" });
      }
      navigate("/"); 
    } catch (err) {
      console.error("Failed to save recipe:", err);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>{id ? "Edit Recipe" : "Add New Recipe"}</Title>

        <InputGroup>
          <Label htmlFor="title">Recipe Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={recipeModel.title}
            onChange={handleChange}
            placeholder="Enter recipe title"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            value={recipeModel.description}
            onChange={handleChange}
            placeholder="Enter recipe description"
            required
          />
        </InputGroup>

        <SubmitButton type="submit">{id ? "Update Recipe" : "Add Recipe"}</SubmitButton>
      </Form>
    </Container>
  );
};

export default AddRecipe;

// ===== Styled Components =====
const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Title = styled.h2`
  color: #1f2937;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  text-align: center;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  padding: 0.875rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #059669;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: 2px solid #10b981;
    outline-offset: 2px;
  }
`;
