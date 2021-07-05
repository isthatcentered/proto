import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./app"
import { worker } from "./mocks"




if ( process.env.NODE_ENV === "development" ) {
	worker.start()
}

const queryClient = new QueryClient()

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App/>
		</QueryClientProvider>
	</React.StrictMode>
	,
	document.getElementById( "root" ),
);

export { makeStep } from "./contracts"
