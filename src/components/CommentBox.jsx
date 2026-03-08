import { useState, useEffect } from "react";
import api from "../services/api";

export default function CommentBox({ productId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Charger les commentaires existants
  useEffect(() => {
    api.get(`/products/${productId}/comments/`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [productId]);

  // Ajouter un commentaire
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    api.post(`/products/${productId}/comments/`, { text: newComment })
      .then(res => {
        setComments([...comments, res.data]);
        setNewComment("");
      })
      .catch(err => console.error(err));
  };

  // Supprimer un commentaire
  const handleDeleteComment = (id) => {
    api.delete(`/products/${productId}/comments/${id}/`)
      .then(() => {
        setComments(comments.filter(c => c.id !== id));
      })
      .catch(err => console.error(err));
  };

  // Modifier un commentaire
  const handleEditComment = (id, currentText) => {
    const updatedText = prompt("Modifier votre commentaire :", currentText);
    if (!updatedText) return;
    api.put(`/products/${productId}/comments/${id}/`, { text: updatedText })
      .then(res => {
        setComments(comments.map(c => c.id === id ? res.data : c));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Commentaires</h2>

      {/* Liste des commentaires */}
      <ul className="space-y-4">
        {comments.map(c => (
          <li key={c.id} className="border-b pb-2">
            <p className="text-gray-800">{c.text}</p>
            <div className="flex space-x-3 mt-2 text-sm">
              <button
                onClick={() => handleDeleteComment(c.id)}
                className="text-red-500 hover:underline"
              >
                Supprimer
              </button>
              <button
                onClick={() => handleEditComment(c.id, c.text)}
                className="text-blue-500 hover:underline"
              >
                Modifier
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Ajouter un nouveau commentaire */}
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Écrire un commentaire..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleAddComment}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
          Publier
        </button>
      </div>
    </div>
  );
}
