import React, { useRef } from 'react';
import { ProductType } from "@/app/types/ProductType";

type Props = {
  setProducts: (products: ProductType) => void;
};

export default function AddProductField({setProducts}: Props) {
	const nameInputRef = useRef<HTMLInputElement>(null);
  	const descriptionInputRef = useRef<HTMLInputElement>(null);
  	const priceInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const nameInput = (
		e.currentTarget.elements.namedItem("name-input") as HTMLInputElement
		).value;
		const descriptionInput = (
		e.currentTarget.elements.namedItem("description-input") as HTMLInputElement
		).value;
		const priceInput = parseFloat(
		(e.currentTarget.elements.namedItem("price-input") as HTMLInputElement).value
		);

		const newProduct: ProductType = {
			name: nameInput,
			description: descriptionInput,
			price: priceInput,
		};

		try {
			const response = await fetch("http://localhost:8080/product", {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify(newProduct),
			});

			if (!response.ok) {
				console.log("Error posting data");
			} else {
				const data = await response.json();
				console.log("Response ok: ", data);
				setProducts(data);
				if (nameInputRef.current) nameInputRef.current.value = "";
        		if (descriptionInputRef.current) descriptionInputRef.current.value = "";
        		if (priceInputRef.current) priceInputRef.current.value = "";
			}
		} catch (error) {
			console.log("Error:", error);
		}
  	};

  return (
    <section className="min-w-[36rem] h-10 rounded-lg border-2 border-gray-400/40 self-center">
      <form onSubmit={handleSubmit} className="h-full">
        <div className="h-full text-gray-400/80 flex items-center">
          <label htmlFor="name-input" className="hidden">
            Nome
          </label>
          <input
            ref={nameInputRef}
            id="name-input"
            type="text"
            placeholder="Nome do produto"
            required
            className="h-full max-w-[10rem] bg-transparent outline-none px-4"
          />
          <hr className="border-gray-400/40 border h-3/5" />
          <label htmlFor="description-input" className="hidden">
            Descrição
          </label>
          <input
            ref={descriptionInputRef}
            id="description-input"
            type="description"
            placeholder="Descrição"
            required
            className="h-full grow bg-transparent outline-none px-4"
          />
          <hr className="border-gray-400/40 border h-3/5" />
          <label htmlFor="price-input" className="hidden">
            Preço
          </label>
          <input
            ref={priceInputRef}
            id="price-input"
            type="number"
            step="0.01"
            min="0"
            pattern="^\d+(\.\d{1,2})?$"
            required
            placeholder="Preço"
            className="h-full w-24 bg-transparent outline-none px-4"
          />
          <hr className="border-gray-400/40 border h-3/5" />
          <button
            type="submit"
            aria-label="Inscrever na newsletter"
            className="px-4 flex"
          >
            <span className="active:scale-90">
              Adicionar
            </span>
          </button>
        </div>
      </form>
    </section>
  );
}