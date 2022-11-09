// ** React Imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Third-Party Imports
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Configs
import { getPostCats } from "../../../services/postCats";
import * as posts from "../../../services/post";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";

const MySwal = withReactContent(Swal);

const statusOpts = [
  { value: "publish", label: "Publish" },
  { value: "draft", label: "Draft" },
];

const AddPost = () => {
  // ** Post States
  const [postCats, setPostCats] = useState([]);
  const [category, setCategory] = useState([]);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState(EditorState.createEmpty());
  const [status, setStatus] = useState(statusOpts[0]);
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const postCats = await getPostCats();
      const { data } = postCats;
      const options = data.map((i) => {
        return { value: i.id, label: i.name };
      });
      setPostCats(options);
      setCategory(options[0]);
    } catch (err) {
      console.log(err);
    }
  };

  // const saveTutorial = () => {
  //   var data = {
  //     title: tutorial.title,
  //     description: tutorial.description,
  //   };
  //   TutorialDataService.create(data)
  //     .then((response) => {
  //       setTutorial({
  //         id: response.data.id,
  //         title: response.data.title,
  //         description: response.data.description,
  //         published: response.data.published,
  //       });
  //       setSubmitted(true);
  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const savePost = async (e) => {
    e.preventDefault();

    const postData = {
      category: category.value,
      date: date.toISOString(),
      title: title,
      excerpt: excerpt,
      content: content.getCurrentContent(),
      content1: convertToRaw(content.getCurrentContent()),
      content2: draftToHtml(convertToRaw(content.getCurrentContent())),
      status: status.value,
      featured: featured,
    };

    try {
      if (status.value === "publish") {
        const res = await MySwal.fire({
          icon: "warning",
          title: "Publicar Artigo?",
          text: "Esta acção publica o Artigo!",
          showCancelButton: true,
          confirmButtonText: "Publicar",
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-outline-danger ms-1",
          },
          buttonsStyling: false,
        });
        if (res.value) {
          await posts.getPost(1);
          await MySwal.fire({
            icon: "success",
            title: "Gravado!",
            text: "O seu artigo foi gravado.",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      } else {
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("response");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("request");
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("message");
        console.log("Error", error.message);
      }
      console.log("config");
      console.log(error.config);
    }
  };

  return (
    <div className="blog-edit-wrapper">
      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex">header avatar</div>
              <Form className="mt-2" onSubmit={savePost}>
                <Row>
                  <Col md="10" className="mb-2">
                    <Label className="form-label" for="post-title">
                      Title
                    </Label>
                    <Input
                      id="post-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></Input>
                  </Col>
                  <Col md="2" className="mb-2">
                    <Label for="post-featured" className="form-check-label">
                      Featured
                    </Label>
                    <div className="form-switch">
                      <Input
                        type="switch"
                        id="post-featured"
                        value={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                      />
                    </div>
                  </Col>
                  <Col md="4" className="mb-2">
                    <Label className="form-label" for="post-date">
                      Date
                    </Label>
                    <Flatpickr
                      id="post-date"
                      className="form-control"
                      data-enable-time
                      value={date}
                      onChange={(date) => setDate(date)}
                    />
                  </Col>
                  <Col md="4" className="mb-2">
                    <Label className="form-label" for="post-category">
                      Category
                    </Label>
                    <Select
                      id="post-category"
                      value={category}
                      onChange={setCategory}
                      options={postCats}
                    />
                  </Col>
                  <Col md="4" className="mb-2">
                    <Label className="form-label" for="post-status">
                      Status
                    </Label>
                    <Select
                      id="post-status"
                      value={status}
                      onChange={setStatus}
                      options={statusOpts}
                    />
                  </Col>
                  <Col sm="12" className="mb-2">
                    <Label className="form-label" for="post-excerpt">
                      Excerpt
                    </Label>
                    <Input
                      type="textarea"
                      id="post-excerpt"
                      rows="3"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                    />
                  </Col>
                  <Col sm="12" className="mb-2">
                    <Label className="form-label" for="post-content">
                      Content
                    </Label>
                    <Editor
                      editorState={content}
                      onEditorStateChange={(data) => setContent(data)}
                    />
                  </Col>
                  <Col className="mt-50">
                    <Button color="primary" className="me-1" type="submit">
                      Save Changes
                    </Button>
                    <Link className="btn btn-outline-secondary" to={"/blog"}>
                      Cancel
                    </Link>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddPost;
