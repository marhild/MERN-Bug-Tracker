import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/style.css'

const SectionA = () => {
  return ( <section className='section-a'>
  <div className='container'>
    <div>
      <div>
        <h1>The Objective of the Future.</h1>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          repudiandae rerum libero ipsum asperiores omnis mollitia,
          nostrum commodi placeat ea itaque modi corrupti corporis nam
          voluptas aut reprehenderit eaque culpa.
        </p>
      </div>
      <div>
        <Link to={`#`} className='btn btn-read-more'>
          Read More
        </Link>
      </div>
    </div>
    <div >
      <img
        style={{ marginTop: '50px' }}
        src={require(`../../assets/img/product2.jpeg`)}
        alt=''
      />
    </div>
  </div>
</section> )
}

export default SectionA