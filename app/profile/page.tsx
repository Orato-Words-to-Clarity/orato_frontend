'use client';
import React, { useState } from 'react';
import DashboardHeader from '../components/dashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { CheckIcon, ExternalLinkIcon, PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ApiKeyData } from './types';

const ProfilePage = () => {
  // eslint-disable-next-line
  const [userEmail, setUserEmail] = useState<string>('test@gmail.com');
  const [useOwnKeys, setUseOwnKeys] = useState<boolean>(false);
  const [apiKeyData, setApiKeyData] = useState<ApiKeyData>({
    hasKeys: false,
    groqKey: '',
    huggingFaceKey: '',
    hasChange: false,
    editingGroqKey: false,
    editingHuggingFaceKey: false,
  });

  const handleKeyChange = (key: keyof ApiKeyData, value: string | boolean) => {
    setApiKeyData((prevData) => ({
      ...prevData,
      [key]: value,
      hasChange: true,
    }));
  };

  const handleToggleChange = () => {
    setUseOwnKeys((prevUseOwnKeys) => !prevUseOwnKeys);
    if (useOwnKeys) {
      setApiKeyData((prevData) => ({
        ...prevData,
        groqKey: '',
        huggingFaceKey: '',
      }));
    } else {
      setApiKeyData((prevData) => ({
        ...prevData,
        hasChange: true,
        editingGroqKey: true,
        editingHuggingFaceKey: true,
      }));
    }
  };

  const handleSave = () => {
    setApiKeyData((prevData) => ({
      ...prevData,
      hasChange: false,
      editingGroqKey: false,
      editingHuggingFaceKey: false,
    }));
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <DashboardHeader />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <span className='font-medium w-24'>Email:</span>
                <span>{userEmail}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>API Key Management</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center space-x-2'>
              <Switch id='use-own-keys' checked={useOwnKeys} onCheckedChange={handleToggleChange} />
              <Label htmlFor='use-own-keys'>Use My Own API Keys</Label>
            </div>

            {useOwnKeys && (
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <Label htmlFor='groq-key'>Groq API Key</Label>
                      <Link
                        href='https://console.groq.com/keys'
                        target='_blank'
                        className='text-xs text-blue-500 hover:underline flex items-center'
                      >
                        How to get it? <ExternalLinkIcon className='h-3 w-3 ml-1' />
                      </Link>
                    </div>

                    {!apiKeyData.editingGroqKey && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleKeyChange('editingGroqKey', true)}
                      >
                        <PencilIcon className='h-4 w-4' />
                      </Button>
                    )}
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Input
                      id='groq-key'
                      type='password'
                      placeholder='Enter your Groq API key'
                      value={apiKeyData.groqKey}
                      onChange={(e) => handleKeyChange('groqKey', e.target.value)}
                      disabled={!apiKeyData.editingGroqKey}
                      className='flex-1'
                    />

                    {apiKeyData.editingGroqKey && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleKeyChange('editingGroqKey', false)}
                      >
                        <CheckIcon className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <Label htmlFor='huggingface-key'>Hugging Face API Key</Label>
                      <Link
                        href='https://huggingface.co/settings/tokens'
                        target='_blank'
                        className='text-xs text-blue-500 hover:underline flex items-center'
                      >
                        How to get it? <ExternalLinkIcon className='h-3 w-3 ml-1' />
                      </Link>
                    </div>

                    {!apiKeyData.editingHuggingFaceKey && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleKeyChange('editingHuggingFaceKey', true)}
                      >
                        <PencilIcon className='h-4 w-4' />
                      </Button>
                    )}
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Input
                      id='huggingface-key'
                      type='password'
                      placeholder='Enter your Hugging Face API key'
                      value={apiKeyData.huggingFaceKey}
                      onChange={(e) => handleKeyChange('huggingFaceKey', e.target.value)}
                      disabled={!apiKeyData.editingHuggingFaceKey}
                      className='flex-1'
                    />

                    {apiKeyData.editingHuggingFaceKey && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleKeyChange('editingHuggingFaceKey', false)}
                      >
                        <CheckIcon className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                </div>

                {apiKeyData.hasChange && (
                  <Button
                    onClick={handleSave}
                    className='mt-4'
                    disabled={
                      apiKeyData.groqKey.length === 0 ||
                      apiKeyData.huggingFaceKey.length === 0 ||
                      !apiKeyData.hasChange
                    }
                  >
                    Save API Keys
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfilePage;
