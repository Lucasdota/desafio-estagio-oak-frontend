import React from 'react'
import { ProductType } from "@/app/types/ProductType";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

type Props = {
  products: ProductType[];
  fetchData: () => Promise<void>;
};

export default function Products({products, fetchData}: Props) {

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  	const handleUpdate = async (productId: number) => {
      try {
        const response = await fetch(
          `http://localhost:8080/product/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: productId }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        fetchData();
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    };

	const handleDelete = async (productId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productId }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchData();
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <section
      className={`min-w-[36rem] min-h-48 rounded-lg border-2 border-gray-400/40 px-6 py-3 self-center ${
        products.length > 0 ? "" : "flex items-center justify-center"
      }`}
    >
      {products.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Descrição</th>
              <th className="px-4 py-2 text-left">Preço</th>
              <th className="px-4 py-2 text-left">Disponibilidade</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`border-t ${
                  index == 0 ? "border-t-2 border-white-400/40" : " border-gray-400/40"
                }`}
              >
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">{formatPrice(product.price)}</td>
                <td className="px-4 py-2 flex items-center justify-center">
                  {product.available ? "Disponível" : "Indisponível"}
                </td>
                <td>
                  <button
                    onClick={() => handleUpdate(product.id)}
                    className="flex items-center justify-center"
                  >
                    {product.available ? (
                      <MdBlock className="hover:scale-110 text-red-500" />
                    ) : (
                      <FaRegCircleCheck className="hover:scale-110 text-green-500" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center justify-center"
                  >
                    <FaRegTrashAlt className="hover:scale-110 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-400/40">Vazio.</p>
      )}
    </section>
  );
}
