import React, { useState } from 'react';
import {
  X,
  Users,
  Copy,
  Check,
  Crown,
  Play,
  Tv,
  LogOut,
  User,
  Sparkles,
  ArrowRight,
  QrCode,
} from 'lucide-react';
import { useWatchTogether } from '../context/WatchTogetherContext';
import { useApp } from '../context/AppContext';

const AVATAR_COLORS = [
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#f97316', // Orange
];

export const WatchTogetherModal: React.FC = () => {
  const {
    roomId,
    userName,
    userColor,
    setUserName,
    setUserColor,
    members,
    syncState,
    isRoomModalOpen,
    setIsRoomModalOpen,
    isConnecting,
    error,
    createRoom,
    joinRoom,
    leaveRoom,
    copyRoomLink,
  } = useWatchTogether();

  const { playerState, playMedia } = useApp();

  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [editingName, setEditingName] = useState(userName);
  const [showQR, setShowQR] = useState(false);

  if (!isRoomModalOpen) return null;

  const handleCreate = async () => {
    try {
      await createRoom();
    } catch (e) {
      console.error(e);
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCodeInput.trim()) return;
    const success = await joinRoom(joinCodeInput.trim());
    if (success) {
      setJoinCodeInput('');
    }
  };

  const handleCopyLink = () => {
    const ok = copyRoomLink();
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveName = () => {
    if (editingName.trim()) {
      setUserName(editingName.trim());
    }
  };

  const currentShareUrl = roomId
    ? `${window.location.origin}${window.location.pathname}?watchRoom=${roomId}`
    : '';

  const activeMediaTitle = syncState?.media?.title || syncState?.media?.name || playerState?.media?.title || playerState?.media?.name;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
                <span>Watch Together</span>
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                  Online Sync
                </span>
              </h2>
              <p className="text-xs text-slate-400">Watch movies & TV shows in sync with friends</p>
            </div>
          </div>

          <button
            onClick={() => setIsRoomModalOpen(false)}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
              {error}
            </div>
          )}

          {/* User Profile customization */}
          <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
              <User className="w-4 h-4 text-amber-400" />
              <span>Your Watch Party Avatar</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-slate-950 text-base shadow-md shrink-0"
                style={{ backgroundColor: userColor }}
              >
                {(editingName || 'U').charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 w-full flex items-center space-x-2">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={handleSaveName}
                  placeholder="Enter your name"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white outline-none focus:border-amber-400"
                />
              </div>

              {/* Avatar color selector */}
              <div className="flex items-center space-x-1.5 shrink-0">
                {AVATAR_COLORS.slice(0, 5).map((color) => (
                  <button
                    key={color}
                    onClick={() => setUserColor(color)}
                    className={`w-6 h-6 rounded-full transition-transform ${
                      userColor === color ? 'scale-125 ring-2 ring-amber-400' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ROOM ACTIVE STATE */}
          {roomId ? (
            <div className="space-y-5">
              {/* Room Banner */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      Room Code
                    </span>
                    <div className="text-3xl font-black text-amber-400 tracking-wider font-mono">
                      {roomId}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowQR(!showQR)}
                      className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title="Show QR Code"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied Link!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Party Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* QR Code view toggle */}
                {showQR && (
                  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                        currentShareUrl
                      )}`}
                      alt="Room QR Code"
                      className="w-36 h-36"
                    />
                    <span className="text-[11px] font-bold text-slate-900 mt-2">
                      Scan with phone camera to join
                    </span>
                  </div>
                )}

                {/* Active Media Status */}
                {activeMediaTitle ? (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Tv className="w-4 h-4 text-amber-400" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Now Playing Together</span>
                        <span className="text-xs font-bold text-white truncate max-w-[200px] block">
                          {activeMediaTitle}
                        </span>
                      </div>
                    </div>
                    {syncState?.media && !playerState?.isOpen && (
                      <button
                        onClick={() => {
                          playMedia(
                            syncState.media!,
                            syncState.season || 1,
                            syncState.episode || 1,
                            syncState.episodeTitle
                          );
                          setIsRoomModalOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center space-x-1"
                      >
                        <Play className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Watch Now</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-xs text-slate-400 py-2">
                    💡 Play any movie or show to start streaming together in sync!
                  </div>
                )}
              </div>

              {/* Members List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>Connected Viewers ({members.length})</span>
                  </div>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-950 text-xs shadow-md"
                          style={{ backgroundColor: member.avatarColor || userColor }}
                        >
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs font-bold text-white">
                          {member.name} {member.name === userName && '(You)'}
                        </span>
                      </div>

                      {member.isHost && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30 flex items-center space-x-1">
                          <Crown className="w-3 h-3" />
                          <span>Host</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Leave Room Button */}
              <button
                onClick={() => {
                  leaveRoom();
                  setIsRoomModalOpen(false);
                }}
                className="w-full py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Leave Watch Party</span>
              </button>
            </div>
          ) : (
            /* NO ROOM ACTIVE - CREATE OR JOIN OPTIONS */
            <div className="space-y-6">
              {/* Option A: Create New Room */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Host a Watch Party</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Get a room code and invite anyone to watch movies together online.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCreate}
                  disabled={isConnecting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isConnecting ? (
                    <span>Creating Party Room...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Create New Watch Party</span>
                    </>
                  )}
                </button>
              </div>

              {/* Option B: Join Existing Room */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Join Existing Party</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Enter the 6-character room code from your friend.
                  </p>
                </div>

                <form onSubmit={handleJoin} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={joinCodeInput}
                    onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                    placeholder="e.g. OST482"
                    maxLength={6}
                    className="flex-1 bg-slate-900 border border-slate-700 uppercase tracking-widest font-mono text-center font-extrabold text-amber-400 text-sm rounded-2xl px-4 py-3 outline-none focus:border-amber-400"
                  />

                  <button
                    type="submit"
                    disabled={isConnecting || !joinCodeInput.trim()}
                    className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 disabled:opacity-40 font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer shrink-0"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
