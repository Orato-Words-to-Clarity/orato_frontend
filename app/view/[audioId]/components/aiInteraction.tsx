import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreatePayloadType } from '../../types';
import { createInteraction } from '@/api/interactions';
import { PuffLoader } from 'react-spinners';

export const AiInteraction = ({ transcription_id }: { transcription_id: string }) => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [createPayload, setCreatePayload] = useState<CreatePayloadType>({
    request_type: '',
    custome_prompt: '',
    transcription_id: transcription_id,
  });
  const [loadingGeneration, setLoadingGeneration] = useState<boolean>(false);

  const handleAskQuery = () => {
    // Implement AI query logic here
    setAiResponse(`This is a sample AI response to the query: "${query}"`);
  };

  const handleGenerateDefault = (type: string) => {
    setCreatePayload((prevPayload) => ({
      ...prevPayload,
      request_type: type,
      custome_prompt: '',
    }));
  };

  const handleGenerateCustome = () => {
    setCreatePayload((prevPayload) => ({
      ...prevPayload,
      request_type: 'custom',
    }));
  };

  useEffect(() => {
    if (transcription_id) {
      setCreatePayload({
        ...createPayload,
        transcription_id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcription_id]);

  useEffect(() => {
    if (createPayload.request_type) {
      setLoadingGeneration(true);
      createInteraction(createPayload, setGeneratedContent, setCreatePayload, setLoadingGeneration);
    }
  }, [createPayload]);

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>AI Interaction</h2>
      <Tabs defaultValue='ask'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='ask'>Ask</TabsTrigger>
          <TabsTrigger value='create'>Create</TabsTrigger>
        </TabsList>
        <TabsContent value='ask'>
          <div className='space-y-4'>
            <Input
              placeholder='Ask a question about the transcription'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={handleAskQuery}>Submit</Button>
            {aiResponse && (
              <div className='mt-4 p-4 bg-gray-100 rounded-md'>
                <h3 className='font-semibold mb-2'>AI Response:</h3>
                <p>{aiResponse}</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value='create'>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-2'>
              <Button onClick={() => handleGenerateDefault('meeting_minutes')}>
                Meeting Minutes
              </Button>
              <Button onClick={() => handleGenerateDefault('class_notes')}>Class Notes</Button>
              <Button onClick={() => handleGenerateDefault('summary')}>Summary</Button>
            </div>
            <Textarea
              placeholder='Enter a custom prompt'
              value={createPayload.custome_prompt}
              onChange={(e) =>
                setCreatePayload({ ...createPayload, custome_prompt: e.target.value })
              }
            />
            <Button
              onClick={() => handleGenerateCustome()}
              disabled={!createPayload.custome_prompt}
            >
              Generate
            </Button>
            {(loadingGeneration || generatedContent) && (
              <div className='mt-4 p-4 bg-gray-100 rounded-md'>
                {loadingGeneration ? (
                  <div className='flex justify-center'>
                    <PuffLoader color='#000' size={50} />
                  </div>
                ) : (
                  <>
                    <h3 className='font-semibold mb-2'>Generated Content:</h3>
                    <p dangerouslySetInnerHTML={{ __html: generatedContent }}></p>
                    <div className='mt-4 flex justify-end space-x-2'>
                      <Button variant='outline'>Export as TXT</Button>
                      <Button variant='outline'>Export as DOC</Button>
                      <Button variant='outline'>Export as PDF</Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
