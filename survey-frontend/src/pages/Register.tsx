import { useState } from "react";
import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";

import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

const Register = () => {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [fullName, setFullName] = useState("Ajao Yussuf");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("yussuf");
  const [passwordConfirmation, setPasswordConfirmation] = useState("yussuf");
  const [error, setError] = useState({ __html: "" });
  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/signup", {
        name: fullName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);

        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          console.log(finalErrors);
          setError({ __html: finalErrors.join("<br>") });
        }
        console.error(error);
      });
  };

  return (
    <>
      <div className="w-full h-full ">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Signup for free
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login with your account
          </Link>
        </p>

        {error.__html && (
          <div
            className="bg-red-500 rounded py-2 px-3 text-white"
            dangerouslySetInnerHTML={error}
          ></div>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={(e) => onSubmit(e)}
          >
            {/* Fullname */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  autoComplete="fullname"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12"
                  value={fullName}
                  onChange={(ev) => setFullName(ev.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={passwordConfirmation}
                  onChange={(ev) => setPasswordConfirmation(ev.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-start rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center h-12"
              >
                <LockClosedIcon className="w-6 h-4 text-white" />
                <span className="w-4/5">Register</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
