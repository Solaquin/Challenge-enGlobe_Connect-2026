import Layout from "../components/layout/Layout";
import LaunchForm from "../components/createLaunch/LaunchForm";

function CreateLaunch() {

    return (

        <Layout>

            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl font-bold mb-2">

                    Create Launch

                </h1>

                <p className="text-gray-500 mb-8">

                    Fill in the information for the new product launch.

                </p>

                <LaunchForm />

            </div>

        </Layout>

    );

}

export default CreateLaunch;