import { useState, FormEvent, ChangeEvent, JSX } from "react";
import { FiSearch } from "react-icons/fi"; // icon import

type theme = "light" | "dark";

export default function GoogleSearchBar(theme : theme): JSX.Element {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    const encoded = encodeURIComponent(query.trim());
    window.location.href = `https://www.google.com/search?q=${encoded}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const themes = {
    light: {
      wrapper: "bg-white",
      bar: "bg-gray-100 border border-gray-300",
      text: "text-gray-900",
      icon: "text-gray-600 hover:text-gray-800",
    },
    dark: {
      wrapper: "bg-gray-900",
      bar: "bg-gray-800 border border-gray-600",
      text: "text-gray-100",
      icon: "text-gray-400 hover:text-gray-200",
    },
  };

  const active = themes[theme] || themes.light;

  return (
    <form
      onSubmit={handleSubmit}
      className={`${active.wrapper} w-full flex justify-center py-6`}
    >
      <div
        className={`flex items-center w-2/3 max-w-xl px-4 py-3 rounded-full ${active.bar}`}
      >
        <input
          type="text"
          placeholder="Search Google..."
          value={query}
          onChange={handleChange}
          className={`flex-1 bg-transparent outline-none ${active.text} text-lg`}
        />

        <button
          type="submit"
          className={`p-1 transition ${active.icon}`}
          aria-label="Search"
        >
          <FiSearch size={20} />
        </button>
      </div>
    </form>
  );
}
