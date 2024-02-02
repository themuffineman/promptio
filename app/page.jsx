import Feed from "@components/Feed"


const Home = () => {
  return (
    <section className="w-full flex flex-center flex-col">
        <h1 className="head_text text-center">
            Discover and Share
            <br className="max-md:hidden"/>
            <span className="orange_gradient">AI Powered Prompts</span>
        </h1>
        <p className="desc text-center">
            Promptopia is an open source AI tool for the modern world to create discover and share creative Prompts
        </p>
        <Feed/>
    </section>
  )
}

export default Home