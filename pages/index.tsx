import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
import list from "../constants/list";
import { IoIosClose } from "react-icons/io";

const Home = () => {
  const [showList, setShowList] = useState(false);
  const [text, setText] = useState(""); // text that user is writing in input field
  const [items, setItems] = useState([""]); // all the modifications on list is done in this state
  const [lists, setLists] = useState(list);
  const [recommendedList, setRecommendedList] = useState([""]);
  const setOfList = new Set([""]);

  const handleShowList = () => {
    setShowList(true);
  };

  const addTextToList = (e: any) => {
    e.preventDefault();
    if (text.length != 0) {
      //deleting from list not items as it is chipped once
      const listCopy = [...lists];
      const newlist = listCopy.filter((n) => n !== text);
      setLists(newlist);
      setItems((olditems) => [...olditems, text]);
      e.target.reset();
      setText("");
      setRecommendedList([""]);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Backspace") {
      if (text.length == 0) {
        const itemsCopy = [...items];
        itemsCopy.pop();
        setItems(itemsCopy);
      }
    }
  };
  const handleText = (e: any) => {
    setText(e.target.value);
    if (e.target.value.length != 0) {
      var regex = new RegExp(e.target.value + "*", "gi");
      lists.map(function (w) {
        if (w.match(regex)) {
          setOfList.add(w);
        }
      });

      // setRecommendedList([""]);
      const newlis = [];
      for (const value of setOfList) {
        newlis.push(value);
      }
      setRecommendedList(newlis);
      console.log(recommendedList);
    }
  };

  const handleDelete = (event: any) => {
    const itemsCopy = [...items];
    const newItems = itemsCopy.filter((n) => n !== event);
    setItems(newItems);
  };
  return (
    <main className="h-screen p-20 flex relative">
      <img
        src="https://tse1.mm.bing.net/th?id=OIP.nNmwLdvevxvBJNvLSiElwQHaHa&pid=Api&P=0&h=200"
        className="absolute top-[40%] left-[44%] rounded-full animate-pulse"
        alt=""
      />
      <div className="border border-[#38075d] shadow-2xl w-full rounded-3xl backdrop-blur-sm p-10 overflow-hidden">
        <h1 className="text-white font-bold text-xl pb-10">
          Zepto Chip Component: Assignment
        </h1>
        {/* displaying chips */}
        <div className="flex flex-row flex-wrap gap-2">
          {items.map((name, ind) => (
            <div key={ind}>
              {name.length != 0 ? (
                <div
                  className="text-white px-3 py-1  rounded-full bg-[#B22349] flex items-center"
                  key={ind}
                >
                  <span>{name}</span>
                  <span
                    className="ml-3 text-2xl"
                    onClick={() => handleDelete(name)}
                  >
                    <IoIosClose />
                  </span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <form onSubmit={(e) => addTextToList(e)}>
          <input
            id="name"
            onClick={handleShowList}
            onChange={(e) => handleText(e)}
            onKeyDown={handleKeyDown}
            type="text"
            className="w-full bg-transparent border-b border-[#B22349] py-4 text-white outline-none"
          />
        </form>
        <div
          className={`bg-white w-96 rounded-xl mt-1 ${
            showList === true ? "block" : "hidden"
          }`}
        >
          <small className="px-4 pt-1 italic text-gray-500">
            Matching Results
          </small>
          {recommendedList.map((n) => (
            <h2 className="py-3 hover:bg-[#38075d]/10 px-4" key={n}>
              {n}
            </h2>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
