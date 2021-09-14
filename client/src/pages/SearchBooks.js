import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchGoogleJobs } from '../utils/API';
import { saveJobIds, getSavedJobIds } from '../utils/localStorage';
//Import useMutation hook from apollo
import { useMutation } from '@apollo/react-hooks';
//Import SAVE_BOOK mutation
import { SAVE_BOOK } from '../utils/mutations';

const SearchJobs = () => {
  // create state for holding returned google api data
  const [searchedJobs, setSearchedJobs] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved jobId values
  const [savedJobIds, setSavedJobIds] = useState(getSavedJobIds());

  //Imported mutation
  const [saveJob] = useMutation(SAVE_BOOK);

  // set up useEffect hook to save `savedJobIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveJobIds(savedJobIds);
  });

  // create method to search for jobs and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleJobs(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const jobData = items.map((job) => ({
        jobId: job.id,
        authors: job.volumeInfo.authors || ['No author'],
        title: job.volumeInfo.title,
        description: job.volumeInfo.description,
        image: job.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedJobs(jobData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a job to our database
  const handleSaveJob = async (jobId) => {
    // find the job in `searchedJobs` state by the matching id
    const jobSaving = searchedJobs.find((job) => job.jobId === jobId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // imported SAVE_BOOK mutation
     await saveJob({ variables: {job: jobSaving}});

      // if job successfully saves to user's account, save job id to state
      setSavedJobIds([...savedJobIds, jobSaving.jobId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Jobs!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a job'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedJobs.length
            ? `Viewing ${searchedJobs.length} results:`
            : 'Search for a job to begin'}
        </h2>
        <CardColumns>
          {searchedJobs.map((job) => {
            return (
              <Card key={job.jobId} border='dark'>
                {job.image ? (
                  <Card.Img src={job.image} alt={`The cover for ${job.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <p className='small'>Authors: {job.authors}</p>
                  <Card.Text>{job.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedJobIds?.some((savedJobId) => savedJobId === job.jobId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveJob(job.jobId)}>
                      {savedJobIds?.some((savedJobId) => savedJobId === job.jobId)
                        ? 'This job has already been saved!'
                        : 'Save this Job!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchJobs;