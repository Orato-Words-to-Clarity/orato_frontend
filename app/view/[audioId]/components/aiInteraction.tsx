import React, { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreatePayloadType } from '../../types';
import { askInteraction, createInteraction } from '@/api/interactions';
import { PuffLoader } from 'react-spinners';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const AiInteraction = ({ transcription_id }: { transcription_id: string }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [createPayload, setCreatePayload] = useState<CreatePayloadType>({
    request_type: '',
    custome_prompt: '',
    transcription_id: transcription_id,
  });
  const [loadingGeneration, setLoadingGeneration] = useState<boolean>(false);
  const [loadingAnswering, setLoadingAnswering] = useState<boolean>(false);

  const handleAskQuery = () => {
    if (query && transcription_id) {
      setLoadingAnswering(true);
      askInteraction(transcription_id, query, setAiResponse, setLoadingAnswering);
    }
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

  const exportAsTxt = () => {
    const blob = new Blob([generatedContent.replace(/<[^>]*>?/gm, '')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'export.txt';
    link.click();
  };

  const exportAsDoc = () => {
    const blob = new Blob([generatedContent], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'export.doc';
    link.click();
  };

  const exportAsPdf = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('export.pdf');
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
            <Button onClick={handleAskQuery} disabled={!query}>
              Submit
            </Button>
            {(loadingAnswering || aiResponse) && (
              <div className='mt-4 p-4 bg-gray-100 rounded-md'>
                {loadingAnswering ? (
                  <div className='flex justify-center'>
                    <PuffLoader color='#000' size={50} />
                  </div>
                ) : (
                  <>
                    <h3 className='font-semibold mb-2'>AI Response:</h3>
                    <p>{aiResponse}</p>
                  </>
                )}
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
                    <ScrollArea className='max-h-[400px] w-full rounded-md border p-4 overflow-auto'>
                      <div
                        ref={contentRef}
                        dangerouslySetInnerHTML={{ __html: generatedContent }}
                      ></div>
                    </ScrollArea>
                    <div className='mt-4 flex justify-end space-x-2'>
                      <Button onClick={exportAsTxt} variant='outline'>
                        Export as TXT
                      </Button>
                      <Button onClick={exportAsDoc} variant='outline'>
                        Export as DOC
                      </Button>
                      <Button onClick={exportAsPdf} variant='outline'>
                        Export as PDF
                      </Button>
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
