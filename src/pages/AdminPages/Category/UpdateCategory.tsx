/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Layout,  UploadFile, Divider} from 'antd';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UploadButton from '../../../components/UploadButton/UploadButton';
import React, { useState, useEffect } from 'react';
import { uploadImages } from '../../../api/upload';
import BlockForm from '../Product/BlockForm';

import { useGetOneCateByIdQuery, useUpdateCategoryMutation } from '../../../services/cate.service'
import HeadForm from '../../../components/HeadForm/HeadForm';
import { InputCategories } from '../../../interfaces/category';
import Loading from '../../../components/Loading/Loading';

const UpdateCategory = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams()
    const [form] = Form.useForm<InputCategories>();
    const { data } = useGetOneCateByIdQuery(id!)
    
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryType, setCategoryType] = useState<string>('normal');
    const [files, setFiles] = useState<File[]>([]);
    const [defaultImages, setDefaultImages] = useState<UploadFile[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    
    
    const [handleUpdateCategory] = useUpdateCategoryMutation()
    const handleGetFiles = (files: File[], public_id: string | undefined) => {
        if (!public_id) {
            form.setFieldValue('image', files);
            setFiles(files);
        } else {
            setDefaultImages(() => defaultImages.filter((img) => img.uid !== public_id));
            form.setFieldValue('image', files);
            setFiles(files);
        }
    };


    useEffect(() => {
        if (!data) {
            return
        }
        setCategoryName(data.body.cateName!)
        setCategoryType(data.body.type)
        const formatedFiles: UploadFile[] = [{ uid: data.body.image.public_id, url: data.body.image.url, name: 'image', status: 'done' }] as UploadFile[];
        setDefaultImages(formatedFiles);
        const newbody = {
            ...data?.body,
            _id: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            image: {
                url: data?.body.image.url,
                public_id: data?.body.image.public_id
            }
        }
        // console.log(newbody);
        form.setFieldsValue(
            { ...newbody, image: newbody.image }
        )
    },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [id, data]
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //  const handleOnError = (error:any)=>{
    //     console.log(error);
    //  }
    // onFinishFailed={handleOnError}

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const filesToUpload: File[] = files.filter((file) => file !== undefined);
            console.log(filesToUpload);
            if (filesToUpload.length > 0) {
                const {
                    data: { body }
                } = await uploadImages(filesToUpload);
                form.setFieldValue('image', body.data[0]);
            }
           
            const newFormData = form.getFieldsValue(true);
            await handleUpdateCategory({ id: id!, ...newFormData, cateName: categoryName })
            setLoading(false);
            navigate('/manage/categories');
        } catch (error) {
            setLoading(false);
            console.log(error);

        }
    }

    if (loading) return <Loading sreenSize='lg' />;

    return (

        <>
            <Helmet>
                <title>Chỉnh sửa danh mục</title>
            </Helmet>

            <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '90%' }}>
        {/* <div className='flex-1 flex justify-center items-center flex-col mt-10 w-[100%] '> */}

        <Form form={form} onFinish={handleSubmit} className='mt-10 flex justify-center items-center flex-col w-[100%] ' >
          <div className=' flex justify-between  w-[90%] '>
            <HeadForm
              placeHolder='Danh mục không tên'
              linkBack='/manage/categories'
              disabled={categoryType === 'default' ? true : false}
              changeValue={(value) => setCategoryName(value)}
              initValue={categoryName}
            />

          </div>

          <div className='w-[90%]   flex justify-center   mt-10'  >
            <div className='w-[40%]' >
              <BlockForm title='Thông tin danh mục' >

                      <>
                     
                <Form.Item
                  name={'cateName'}
                >
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Tên danh mục
                      </label>

                  <Input

                    placeholder='Thêm tên danh mục'
                    value={categoryName}
                    disabled={categoryType === 'default' ? true : false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}
                  ></Input>
                </Form.Item>



                <Form.Item
                  name='image'
                  hasFeedback
                  rules={[{ required: true, message: 'Vui lòng tải ảnh lên !' }]}
                >
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Hình ảnh
                  </label>
                  <UploadButton
                    maxCount={1}
                    multiple
                    listStyle='picture-card'
                    getListFiles={handleGetFiles}
                    defaultFiles={defaultImages}
                  />
                </Form.Item>
                </>
              </BlockForm>
            </div>


          </div>

          <Divider />
            <div className='flex justify-end  gap-5 w-[90%]'>
               <Link to={'/manage/categories'}>
                  <button
                     type='button'
                     className='border-[1px] border-[#80b235] text-greenPrimary py-2 px-5 rounded-xl font-semibold text-[1rem] hover:bg-greenPrimary duration-200 hover:text-white'
                  >
                     Hủy
                  </button>
               </Link>
               <Form.Item className='flex flex-col  !mb-0'>
                  <button
                     className='!bg-greenPrimary !text-white py-2 px-5 rounded-xl font-semibold text-[1rem]'
                     type='submit'
                  >
                     Lưu
                  </button>
               </Form.Item>
            </div>

        </Form>
        {/* </div> */}
      </Layout>
        </>
    )
}

export default UpdateCategory