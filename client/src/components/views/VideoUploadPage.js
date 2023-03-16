import { Typography, Button, Form, message, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

export default function VideoUploadPage() {

    const [videoTitle, setVideoTitle] = useState("");
    const [description, setDescription] = useState("");
    const [release, setRelease] = useState(0); // private: 0, public: 1
    const [category, setCategory] = useState(0);

    const catOptions = [
        { value: 0, label: "Film & Animation"},
        { value: 1, label: "Autos & Vehicles"},
        { value: 2, label: "Music"},
        { value: 3, label: "Pets & Animals"},
    ]

    const onVideoDrop = (files) => {
        console.log(files);
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file',files[0]);

        axios.post('/api/video/uploadfiles', formData, config)
        .then(res => {
            if(res.data.success) {
                console.log(res.data);
            }else {
                alert('비디오 업로드에 실패하였습니다.');
            }
        })
        .catch(err => console.error(err))


    }

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }

    const onDescChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onReleaseChange = (e) => {
        setRelease(e);

    }

    const onCategoryChange = (e) => {
        setCategory(e);
    }




    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{ display: 'flex', justifyContent:'space-between' }}>
                    {/* Drop zone */}
                    <Dropzone onDrop={onVideoDrop} multiple={false} maxSize={1000000000}>
                        {({getRootProps, getInputProps}) => (
                            <div style={{ width: '300px', height: '240px', display: 'flex', border: '1px solid lightgray', alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <PlusOutlined style={{ fontSize: '3rem' }} />
                            </div>

                        )}
                    </Dropzone>

                    {/* Thumbnail */}
                    <div>
                    </div>

                </div>
                <br/>
                <br/>

                <label>Title</label>
                <Input placeholder="Title" value={videoTitle} onChange={onTitleChange}/>
                <br/>
                <br/>

                <label>Description</label>
                <TextArea placeholder="Description" value={description} onChange={onDescChange}/>
                <br/>
                <br/>
                <Select
                    defaultValue={release}
                    style={{
                        width: 120,
                    }}
                    onChange={onReleaseChange}
                    options={[
                        {
                        value: 0,
                        label: 'private',
                        },
                        {
                        value: 1,
                        label: 'public',
                        },
                    ]}
                />
                <br/>
                <br/>
                <Select
                    defaultValue={category}
                    style={{
                        width: 200,
                    }}
                    onChange={onCategoryChange}
                    options={catOptions}
                />
                <br/>
                <br/>
                <Button type="primary" size="large">Submit</Button>

            </Form>
        </div>


    );
}