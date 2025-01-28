"use client"
import Image from "next/image";
import Products from "./components/Products";
import { useEffect, useState } from "react";
import { ProductType } from "@/app/types/ProductType";
import AddProductField from "./components/AddProductField";

export default function Home() {
	const [products, setProducts] = useState<ProductType[]>([]);

	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:8080/product", {
				method: "GET"
			});
			if (!response.ok) {
				console.log("Error posting data");
			} else {
				const data = await response.json();
				const sortedData = data.sort(
          (a: ProductType, b: ProductType) => a.price - b.price
        );
				setProducts(sortedData);
			}
		} catch (error) {
			console.log("Error:", error);
		}
	}

	useEffect(() => {
		fetchData();
	}, [products])


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-xl font-bold self-center">
          Desafio Estágio Oak Tecnologia
        </h1>
        <Products products={products} fetchData={fetchData} />
        <AddProductField setProducts={setProducts} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://portfolio-pt-br-rouge.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Portfólio Lucas Dota
        </a>
      </footer>
    </div>
  );
}
