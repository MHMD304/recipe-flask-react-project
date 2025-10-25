import styled from "styled-components";
import { useFetch } from "../hooks/useFetch";
import { getAllRecipes } from "../api/fetcher";
import { deleteRecipe } from "../api/fetcher";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const { data:recipes,setData:setRecipes  } = useFetch(getAllRecipes, []);
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;
    try {
      await deleteRecipe(id);
      // Remove deleted recipe from local state
      setRecipes(recipes.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Failed to delete recipe:", error);
      alert("Failed to delete recipe!");
    }
  };

  const handleEdit = async(id)=>{
    console.log(id)
    navigate(`/add-recipe/${id}`);
  }
  return (
    <Container>
      <Title>Recipe Collection</Title>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Title</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader style={{ width: "120px" }}>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {recipes?.length > 0 ? (
              recipes.map((element) => (
                <TableRow key={element.id}>
                  <TableData>{element.title}</TableData>
                  <TableData>{element.description}</TableData>
                  <TableData>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <EditButton onClick={()=>handleEdit(element.id)} type="button">Edit</EditButton>
                      <DeleteButton onClick={()=>handleDelete(element.id)} type="button">Delete</DeleteButton>
                    </div>
                  </TableData>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableData colSpan="3">
                  <EmptyState>
                    No recipes found. Add your first recipe!
                  </EmptyState>
                </TableData>
              </TableRow>
            )}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default Recipes;

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #1f2937;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 2rem 0;
  text-align: center;
`;

const TableWrapper = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: #f9fafb;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f9fafb;
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableData = styled.td`
  padding: 1rem;
  color: #4b5563;
  font-size: 0.95rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 70px;

  &:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const EditButton = styled(ActionButton)`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #ef4444;
  color: white;

  &:hover {
    background: #dc2626;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
`;
