import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getTasks } from './../../../actions/taskActions'
import PropTypes from 'prop-types'
import Pagination from '../../pagination/Pagination';
import PaginatedTable from './../PaginatedTable'

const List = ({ task: { tasks }, getTasks }) => {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      await getTasks()
      setLoading(false);
    }
    fetchData();
    
  }, [])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tasks.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <PaginatedTable tasks={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={tasks.length}
        paginate={paginate}
      />
    </div>
  );

}

List.propTypes = {
  getTasks: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  task: state.task
})

export default connect(mapStateToProps, { getTasks })(List)
