import React from "react";
import ReactDOM from "react-dom/client";

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

// isAdmin

// const withAdminWarning = (WrappedComponent) => {
//   return (props) => (
//     <div>
//       {props.isAdmin && <p>This is private info. Please don't share!</p>}
//       <WrappedComponent {...props} />
//     </div>
//   );
// };

// const AdminInfo = withAdminWarning(Info);

// const rootElement = document.getElementById("app");
// ReactDOM.createRoot(rootElement).render(
//   <AdminInfo isAdmin={false} info="There are the details" />
// );

// requiredAuthentication

// const requiredAuthentication = (WrappedComponent) => {
//     return (props) => (
//         <div>
//         {!props.isAuthenticated && <p>Please login to see the message</p>}
//         <WrappedComponent {...props} />
//         </div>
//     );
// };

const requiredAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please login to see the info</p>
      )}
    </div>
  );
};

const AuthenticatedInfo = requiredAuthentication(Info);

const rootElement = document.getElementById("app");
ReactDOM.createRoot(rootElement).render(
  <AuthenticatedInfo isAuthenticated={true} info="There are the details" />
);
