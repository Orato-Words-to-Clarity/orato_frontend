import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const AiInteraction = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const handleAskQuery = () => {
    // Implement AI query logic here
    setAiResponse(`This is a sample AI response to the query: "${query}"`);
  };

  const handleGenerateContent = (type: string) => {
    // Implement AI content generation logic here
    setGeneratedContent(`This is sample generated content for: ${type}`);
  };

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
              <Button onClick={() => handleGenerateContent('Meeting Minutes')}>
                Meeting Minutes
              </Button>
              <Button onClick={() => handleGenerateContent('Class Notes')}>Class Notes</Button>
              <Button onClick={() => handleGenerateContent('Summary')}>Summary</Button>
            </div>
            <Textarea
              placeholder='Enter a custom prompt'
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
            <Button onClick={() => handleGenerateContent(customPrompt)}>Generate</Button>
            {generatedContent && (
              <div className='mt-4 p-4 bg-gray-100 rounded-md'>
                <h3 className='font-semibold mb-2'>Generated Content:</h3>
                <p>{generatedContent}</p>
                <div className='mt-4 flex justify-end space-x-2'>
                  <Button variant='outline'>Export as TXT</Button>
                  <Button variant='outline'>Export as DOC</Button>
                  <Button variant='outline'>Export as PDF</Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
