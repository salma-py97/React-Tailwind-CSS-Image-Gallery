import {useState, useEffect} from 'react'
import ImageCard from './components/ImageCard'
import ImageSearch from './components/ImageSearch'


const App = () => {
  // State
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [term, setTerm] = useState('')

  // UseEffect
  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(data => {
      setImages(data.hits)
      setIsLoading(false)
    })
    .catch(err => console.log(err))
  }, [term])



  return (
    <div className="container mx-auto flex flex-col justify-center items-center px-4">
      <h1 className="mt-7 text-4xl font-bold text-blue-700">IMAGE GALLERY</h1>
      <ImageSearch searchText={text => setTerm(text)} />

      {!isLoading && images.length === 0 && <h1 className="text-4xl text-center mx-auto flex items-center justify-center mt-5">No Images found...</h1>}


      {isLoading 
      ? 
      <h1 className="text-6xl text-center mx-auto flex items-center justify-center mt-5">LOADING...</h1>
      :
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-7">
      {images.map(image => (
        <ImageCard key={image.id} image={image} />
      ))}
      </div>}
    </div>
  );
}

export default App;
