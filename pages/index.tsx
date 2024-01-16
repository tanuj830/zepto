import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
import list from "../constants/list";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import { IoNavigateOutline } from "react-icons/io5";

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
    <main className="h-screen p-4 md:p-10">
      <div className="flex justify-center md:items-center h-full">
        <div className="md:border w-full md:w-[70%] lg:w-[40%] md:shadow-md rounded-3xl backdrop-blur-sm md:p-10 overflow-hidden">
          <div className="flex gap-x-2 items-center ">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.pDtzEPOQOzzjbcld_yWu3wHaDt&pid=Api&P=0&h=40"
              alt=""
            />
            <h1 className=" font-base text-md md:text-md pb-3 text-gray-500">
              | Chip Component: Assignment
            </h1>
          </div>
          <Link
            href="/input"
            className="text-white flex items-center  gap-1 w-24 p-1 rounded-full bg-pink-500"
          >
            <span className="text-xs font-base">Check Input</span>
            <IoNavigateOutline />
          </Link>

          {/* displaying chips */}
          <div className="flex flex-row flex-wrap gap-2 py-8">
            {items.map((name, ind) => (
              <div key={ind}>
                {name.length != 0 ? (
                  <div
                    className="font-medium px-3 py-1  bg-pink-500/5 text-sm rounded-full border border-[#F5436B] flex items-center"
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
              placeholder="Example: Marina Augustine"
              className="w-full bg-pink-300/5 border text-base rounded-full px-6 border-[#B22349] py-4   outline-none"
            />
          </form>
          <div
            className={`bg-white w-full rounded-xl mt-1 ${
              showList === true ? "block" : "hidden"
            }`}
          >
            <small className="px-4 pt-1 italic text-gray-500">
              Matching Results
            </small>
            {recommendedList.map((na) => (
              <h2
                className="py-3 rounded-md hover:bg-[#F5436B]/5 px-4"
                key={na}
                onClick={() => {
                  const listCopy = [...lists];
                  const newlist = listCopy.filter((n) => n !== na);
                  setLists(newlist);
                  setItems((olditems) => [...olditems, na]);
                  // e.target.reset();
                  setText("");
                  setRecommendedList([""]);
                }}
              >
                {na}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
