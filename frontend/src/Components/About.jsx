import React from 'react'

const About = () => {
  return (
    <div>
        {/* Short about page */}

        <h1 className='mx-auto text-center text-6xl uppercase my-4'>About</h1>
        <p className=' mx-auto w-[70%] text-center p-3 m-2'>In today's digital age, the overwhelming volume of video content presents challenges in efficiently accessing key information. Our project addresses this by developing an application that converts video content into concise textual summaries.
          <span className="text-center"><p className='px-8 py-2'>The system processes user-provided video files or URLs, extracts audio, transcribes it into text, and then generates summaries highlighting the essential points.
          </p>
          </span> </p>
    </div>
  )
}

export default About