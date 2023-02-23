import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/style.css'

const SectionD = () => {
  return (
    <section className='section-d'>
      <div className='container'>
        <div>
          <div>
            <img src={require(`../../assets/img/product1.jpg`)} alt='' />
          </div>
        </div>
        <div>
          <div>
            <h1>Find the system that’s right for you</h1>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
              voluptas delectus iste dicta amet minima recusandae doloremque
              quidem distinctio nihil itaque cumque ullam eos, dignissimos animi
              libero suscipit blanditiis voluptatum!
            </p>
          </div>
          <div>
            <Link to={`#`} className='btn btn-read-more'>
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionD
