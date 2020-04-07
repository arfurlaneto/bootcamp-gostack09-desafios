import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  LoadingIssues,
  Owner,
  IssueList,
  IssuesFilter,
  Paginator,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    issuesPage: 1,
    issuesFilter: 'all',
    loading: true,
    loadingIssues: false,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository] = await Promise.all([
      api.get(`/repos/${repoName}`),
      this.loadIssues(),
    ]);

    this.setState({
      repository: repository.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    this.setState({
      loadingIssues: true,
    });

    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const { issuesPage, issuesFilter } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        page: issuesPage,
        state: issuesFilter,
        per_page: 5,
      },
    });

    this.setState({
      issues: issues.data,
      loadingIssues: false,
    });
  };

  handleIssuesFilterChange = async e => {
    this.setState(
      {
        issuesPage: 1,
        issuesFilter: e.target.value,
      },
      () => this.loadIssues()
    );
  };

  handleIssuesPageChange = async inc => {
    const { issuesPage } = this.state;
    const newPage = issuesPage + inc;
    if (newPage > 0) {
      this.setState(
        {
          issuesPage: newPage,
        },
        () => this.loadIssues()
      );
    }
  };

  render() {
    const {
      repository,
      issues,
      issuesPage,
      issuesFilter,
      loading,
      loadingIssues,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        {loadingIssues ? (
          <LoadingIssues>Carregando Issues...</LoadingIssues>
        ) : (
          <IssueList>
            <IssuesFilter>
              <span>Exibir Issues:</span>
              <select
                value={issuesFilter}
                onChange={this.handleIssuesFilterChange}
              >
                <option value="all">Todas</option>
                <option value="open">Abertas</option>
                <option value="closed">Fechadas</option>
              </select>
            </IssuesFilter>
            {issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={label.id}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
            <Paginator>
              <button
                type="button"
                onClick={() => this.handleIssuesPageChange(-1)}
                disabled={issuesPage === 1}
              >
                <FaArrowLeft color="#7159c1" />
                Anterior
              </button>
              <div>Página {issuesPage}</div>
              <button
                type="button"
                onClick={() => this.handleIssuesPageChange(+1)}
              >
                Próxima
                <FaArrowRight color="#7159c1" />
              </button>
            </Paginator>
          </IssueList>
        )}
      </Container>
    );
  }
}
