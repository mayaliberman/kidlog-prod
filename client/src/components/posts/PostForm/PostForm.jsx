import React, { useContext, useEffect, useState } from 'react';
import {
  desc,
  button,
  secondPartForm,
  postForm,
  firstPartForm,
  inputSecondPart,
  inputErrors,
  selectInput,
  filebutton,
  descError,
} from './PostForm.module.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { getUser } from '../../../services/cookies';
import PostContext from '../../../context/post/postContext';
import UserContext from '../../../context/user/userContext';
import uploadIcon from '../../../assets/add-photo.svg';
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const AddPostSchema = Yup.object().shape({
  desc: Yup.string().required('**Post Description is Required'),
  lessonNum: Yup.number().required('**Lesson Number is Required'),
  childId: Yup.string().required("**Child's Name is Required"),
  file: Yup.mixed().test(
    'fileFormat',
    '**Please upload a photo only',
    (value) => value && SUPPORTED_FORMATS.includes(value.type)
  ),
});

const AddPostForm = (props) => {
  const postContext = useContext(PostContext);
  const userContext = useContext(UserContext);
  const { createPost, loading, currentPost, updatePost } = postContext;
  const { isUpdated } = userContext;

  const [loadingImage, setLoadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  let uploadImageIcon;
  let user = getUser();
  useEffect(() => {
    user = getUser();
    updateImagePreview();
  }, [isUpdated, previewImage, loadingImage, currentPost]);

  const handleFileUpload = async (event) => {
    setLoadingImage(true);
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = async () => {
      setLoadingImage(false);
      await setPreviewImage(reader.result);
    };

    await reader.readAsDataURL(file);
    setLoadingImage(false);
  };

  const updateImagePreview = () => {
    uploadImageIcon = document.getElementById('uploadImageIcon');

    if (currentPost.image) {
      uploadImageIcon.style.backgroundImage = `url(${currentPost.image})`;
      uploadImageIcon.style.width = '60px';
      uploadImageIcon.style.height = '40px';
      uploadImageIcon.style.borderRadius = '5px';
    } else {
      uploadImageIcon.style.backgroundImage = `url(${uploadIcon})`;
    }
    if (previewImage) {
      uploadImageIcon.style.backgroundImage = `url(${previewImage})`;
      uploadImageIcon.style.width = '60px';
      uploadImageIcon.style.height = '40px';
      uploadImageIcon.style.borderRadius = '5px';
    }

    if (!previewImage && !currentPost.childId) {
      uploadImageIcon.style.backgroundImage = `url(${uploadIcon})`;
    }

    uploadImageIcon.style.backgroundSize = 'cover';
    uploadImageIcon.style.objectFit = 'scale-down';
  };

  let arrayOfData = user.children.filter(
    (kid) => (kid = kid.active === true)
  ) || [{ id: 1, name: 'no option' }];
  let options = arrayOfData.map((child) => (
    <option key={child.id} value={child.id}>
      {child.name}
    </option>
  ));

  if (loading) {
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Loading...</h2>
      </div>
    );
  } else {
    return (
      <>
        <Formik
          initialValues={
            currentPost.childId
              ? {
                  desc: currentPost.desc,
                  childId: currentPost.childId.id,
                  lessonNum: currentPost.lessonId.lessonNum,
                  image: currentPost.image || null,
                }
              : {
                  desc: '',
                  childId: '',
                  lessonNum: '',
                  file: '',
                }
          }
          validationSchema={AddPostSchema}
          onSubmit={async (values) => {
            const requestBody = {
              desc: values.desc,
              childId: values.childId,
              lessonNum: values.lessonNum,
              file: values.file,
            };

            const formData = new FormData();
            formData.set('desc', values.desc);
            formData.set('childId', values.childId);
            formData.set('lessonNum', values.lessonNum);
            formData.append('image', values.file);

            currentPost.childId
              ? await updatePost(currentPost._id, formData)
              : await createPost(formData);

            props.submit();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form className={postForm}>
              {errors.desc && touched.desc ? (
                <span className={descError}>{errors.desc} </span>
              ) : null}
              <div className={firstPartForm}>
                <Field
                  as='textarea'
                  name='desc'
                  className={desc}
                  placeholder='Describe here the activity with your kid'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.desc}
                />

                <label className={filebutton} id='uploadImageIcon'>
                  <span>
                    <input
                      type='file'
                      name='file'
                      id='file'
                      onChange={(e) => {
                        setFieldValue('file', e.currentTarget.files[0]);
                        console.log(values.file);
                        handleFileUpload(e);
                      }}
                    />
                  </span>
                </label>
              </div>
              {errors.file && touched.file ? (
                <span className={descError}>{errors.file} </span>
              ) : null}

              <div className={secondPartForm}>
                <div className={inputSecondPart}>
                  <label>Kid</label>

                  <Field
                    className={selectInput}
                    as='select'
                    name='childId'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.childId}
                    default
                  >
                    <option value=''>Select a kid</option>
                    {options}
                  </Field>

                  {errors.childId && touched.childId ? (
                    <div className={inputErrors}>{errors.childId}</div>
                  ) : null}
                </div>
                <div className={inputSecondPart}>
                  <label>Lesson</label>

                  <input
                    type='number'
                    name='lessonNum'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lessonNum}
                  />
                  {errors.lessonNum && touched.lessonNum ? (
                    <div className={inputErrors}>{errors.lessonNum}</div>
                  ) : null}
                </div>
              </div>
              <button type='submit' className={button} disabled={isSubmitting}>
                {props.submitButton}
              </button>
            </Form>
          )}
        </Formik>
      </>
    );
  }
};
export default AddPostForm;

{
  /* <input type="file" accept="image/*" onchange="loadFile(event)">
<img id="output"/>
<script>
  var loadFile = function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  };
</script> */
}
