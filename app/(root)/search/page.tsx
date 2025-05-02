"use client";

import { useSearchQuery } from "@/state/api";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import ProjectCard from "@/components/ProjectCard";
import UserCard from "@/components/UserCard";
const Search = () => {
  const [searchTerms, setSearchTerms] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerms, {
    skip: searchTerms.length < 3,
  });
  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(e.target.value);
  }, 500);
  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div className="">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occur while fetching search results.</p>}
        {searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {searchResults.projects && searchResults.projects?.length > 0 && (
              <h2>Project</h2>
            )}
            {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {searchResults.projects && searchResults.projects?.length > 0 && (
              <h2>Project</h2>
            )}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
